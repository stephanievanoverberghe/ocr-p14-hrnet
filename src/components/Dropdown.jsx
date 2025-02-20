import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

function Dropdown({ name, label, options, control, error, onChange }) {
    return (
        <div className="w-48">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <select
                        {...field}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]"
                        onChange={(e) => {
                            field.onChange(e); // Déclenche la fonction onChange par défaut de React Hook Form
                            if (onChange) onChange(e); // Déclenche la fonction onChange personnalisée
                        }}
                    >
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

Dropdown.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    control: PropTypes.object.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func, // Fonction onChange personnalisée pour le dropdown
};

export default Dropdown;
