
import './Button.css';
import PropTypes from 'prop-types';

const onBtnClick = (page, onLoad) => {       
const newPage = page + 1;
onLoad(newPage)
}
const Button = ({ page, onLoad }) => {

    return <button type="button" className="Button" onClick={() => { onBtnClick(page, onLoad)}}>Load more</button>
}

Button.propTypes = {
    page: PropTypes.number,
    onLoad: PropTypes.func
    }
export default Button;