import React from 'react'
import { projects } from './data'

interface ProjectsProps {
  setActiveMenu: (index: number | null) => void;
}

const Projects: React.FC<ProjectsProps> = ({ setActiveMenu }) => {
  return (
    <div className='relative  z-10 mix-blend-difference  w-full'>
      <ul onMouseLeave={() => {setActiveMenu(null)}} className='border-b'>
        {
          projects.map((project, i) => {
            return (
              <li onMouseOver={() => {setActiveMenu(i)}} key={project.title} className=' p-5 border-t'>
                <p className='text-[3vw] font-normal  text-black'>{project.title}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Projects;