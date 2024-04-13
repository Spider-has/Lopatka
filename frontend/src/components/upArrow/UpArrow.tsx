import { useEffect, useRef } from "react"
import { UpArrowIcon } from "../../icons/Icons"
import "./UpArrow.scss"

type ArrowProps = {
    downHandler: () => void,
    upHandler: () => void,
}

export const UpArrow = (props: ArrowProps) => {

    const arrowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (arrowRef.current) {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY || document.documentElement.scrollTop;

                if (scrollY > 400) {

                    arrowRef.current?.classList.add("up-arrow_show")

                    console.log(document.documentElement.scrollHeight)
                    console.log(scrollY)
                    console.log(window.screen.availHeight)
                    if (document.documentElement.scrollHeight - scrollY - window.screen.availHeight < 200) {
                        props.downHandler()
                    }
                    else {
                        if (document.documentElement.scrollHeight - scrollY - window.screen.availHeight < 400) {
                            props.upHandler()
                        }
                    }
                }
                else {
                    arrowRef.current?.classList.remove("up-arrow_show")
                }
            })
            arrowRef.current.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                })
            })
        }
    }, [])

    return (
        <div ref={arrowRef} className="up-arrow">
            <UpArrowIcon />
        </div>
    )
}