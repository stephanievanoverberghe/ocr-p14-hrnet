import { Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';

function CustomDatePicker({ name, label, control, error }) {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <DatePicker
                        {...field}
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat="MM/dd/yyyy"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]"
                    />
                )}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}

// Définition des PropTypes
CustomDatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    control: PropTypes.object.isRequired,
    error: PropTypes.string,
};

export default CustomDatePicker;
