import PropTypes from 'prop-types';
import './css/EquipmentItem.css';

const EquipmentItem = ({ text }) => {
    return (
        <div className="equipment-item">
            <span className="equipment-text">{text}</span>
        </div>
    );
};

EquipmentItem.propTypes = {
    text: PropTypes.string.isRequired
};

export default EquipmentItem;