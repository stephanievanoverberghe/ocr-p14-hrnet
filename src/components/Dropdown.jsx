import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

function Dropdown({ name, label, options, control, error }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <select {...field} className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]">
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}

// Définition des PropTypes
Dropdown.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    control: PropTypes.object.isRequired,
    error: PropTypes.string,
};

export default Dropdown;
