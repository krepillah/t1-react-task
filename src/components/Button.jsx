import Loader from "../images/preloader.gif"

export default function Button(props) {
    const {onClick, name, status} = props;
    return(
        <button 
            type="button"
            className="take-button" 
            onClick={onClick}
            disabled={status}
        > {name}
        {(status)?(<img src={Loader} alt="loading-image"/>):("")}
        </button>
    );
}