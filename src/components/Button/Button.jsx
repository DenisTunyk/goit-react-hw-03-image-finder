import css from "./Button.module.css"


export const Button = ({onClick}) => {
    return (
        <button className={css.Button} disabled={false} style={{display: "block"}} type="button" onClick={onClick}>Add contact</button>
    )
}