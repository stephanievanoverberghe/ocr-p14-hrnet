import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

function DatePicker({ name, label, control, error }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => <input {...field} type="date" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]" />}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}

// Définition des PropTypes
DatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    error: PropTypes.string,
};

export default DatePicker;
