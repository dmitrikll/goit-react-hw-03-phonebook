import PropTypes from 'prop-types';
import { Input, Label } from './Filter.styled';

export function Filter({ value, onChange }) {
    return (
        <Label>
            Find contacts by name
            <Input
                placeholder="Find something..."
                type="text"
                value={value}
                onChange={onChange}
            />
        </Label>
    );
}

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
