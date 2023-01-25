import { ColorRing } from 'react-loader-spinner'
import css from './Loader.module.css'

export const Loader = ({isLoader}) => {
    return (
        <div className={css.Loader}>
            <ColorRing
            visible={isLoader}
            height="80"
            width="80"
            ariaLabel="radio-loading"
            wrapperStyle={{}}
            wrapperClass="radio-wrapper"
        />
        </div>
        
    )
}