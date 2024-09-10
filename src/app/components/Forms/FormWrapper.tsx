import { ReactNode } from "react"
type FormWrapperProps={
    title :string,
    children:ReactNode
}
export default function FormWrapper({title ,children}:FormWrapperProps){
    return(
        <>
        <h1>{title}</h1>
        <div className="flex flex-col w-[90vw] md:w-[80vw] lg:w-[60vw]">{children}</div>
        </>
    )
}