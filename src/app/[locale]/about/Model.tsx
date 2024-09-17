'use client'
import React, { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { motion } from "framer-motion-3d"
import { animate, useMotionValue, useTransform } from 'framer-motion'
import { vertex, fragment } from './Shader'
import { useTexture } from '@react-three/drei';
import useMouse from './useMouse'
import useDimension from './useDimension'
import { projects } from './data'
import { Mesh, PlaneGeometry, ShaderMaterial } from 'three'

interface ModelProps {
  activeMenu: number | null;
}

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a

const Model: React.FC<ModelProps> = ({ activeMenu }) => {
  const plane = useRef<any>(null);
  const { viewport } = useThree();
  const dimension = useDimension();
  const mouse = useMouse();
  const opacity = useMotionValue(0);
  const textures = projects.map(project => useTexture(project.src))
  const { width, height } = textures[0].image;
  
  // Aspect ratio calculation
  const aspectRatio = width / height;

  // Desired height adjustment
  const desiredHeight = 3; // Adjust this value to change the image height

  // Calculate corresponding width to maintain aspect ratio
  const desiredWidth = (desiredHeight-0.2) * aspectRatio;

  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  }   

  useEffect(() => {
    if(activeMenu !== null) {
      plane.current.material.uniforms.uTexture.value = textures[activeMenu]
      animate(opacity, 1, { duration: 0.2, onUpdate: latest => plane.current.material.uniforms.uAlpha.value = latest })
    } else {
      animate(opacity, 0, { duration: 0.2, onUpdate: latest => plane.current.material.uniforms.uAlpha.value = latest })
    }
  }, [activeMenu, textures, opacity])

  const uniforms = useRef({
    uDelta: { value: { x: 0, y: 0 } },
    uAmplitude: { value: 0.0005 },
    uTexture: { value: textures[0] },
    uAlpha: { value: 0 }
  })

  useFrame(() => {
    const { x, y } = mouse
    const smoothX = smoothMouse.x.get();
    const smoothY = smoothMouse.y.get();

    if (Math.abs(x - smoothX) > 1) {
      smoothMouse.x.set(lerp(smoothX, x, 0.1))
      smoothMouse.y.set(lerp(smoothY, y, 0.1))
      plane.current.material.uniforms.uDelta.value = {
        x: x - smoothX,
        y: -1 * (y - smoothY)
      }
    }
  })

  const x = useTransform(smoothMouse.x, [0, dimension.width], [-1 * viewport.width / 2, viewport.width / 2])
  const y = useTransform(smoothMouse.y, [0, dimension.height], [viewport.height / 2, -1 * viewport.height / 2])

  return(
  <>
    <motion.mesh  position-x={x} position-y={y} ref={plane} scale={[desiredWidth, desiredHeight, 1]}>
    <planeGeometry args={[1, 1, 15, 15]} />
    <shaderMaterial 
      vertexShader={vertex}
      fragmentShader={fragment}
      uniforms={uniforms.current}
      transparent
    />
  </motion.mesh>
  </>
  )
}

export default Model;