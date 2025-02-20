import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../store/employeeSlice';
import CustomDatePicker from '../components/DatePicker';
import Dropdown from '../components/Dropdown';
import Modal from '../components/Modal';
import states from '../data/states';
import departments from '../data/departments';

// ✅ Schéma de validation Yup mis à jour avec `date()`
const employeeSchema = yup.object().shape({
    firstName: yup.string().required('Le prénom est requis'),
    lastName: yup.string().required('Le nom est requis'),
    dateOfBirth: yup.date().nullable().typeError('Veuillez entrer une date valide').required('La date de naissance est requise'),
    startDate: yup.date().nullable().typeError('Veuillez entrer une date valide').required("La date d'embauche est requise"),
    street: yup.string().required("L'adresse est requise"),
    city: yup.string().required('La ville est requise'),
    state: yup.string().required("L'état est requis"),
    zipCode: yup
        .string()
        .matches(/^[0-9]{5}$/, 'Code postal invalide')
        .required('Le code postal est requis'),
    department: yup.string().required('Le département est requis'),
});

function CreateEmployeePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(employeeSchema),
    });

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            dateOfBirth: data.dateOfBirth?.toISOString().split('T')[0],
            startDate: data.startDate?.toISOString().split('T')[0],
        };
        dispatch(addEmployee(formattedData));
        setIsModalOpen(true);
    };

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setTimeout(() => navigate('/list'), 100); // ✅ Délai pour bien afficher la liste mise à jour
    }, [navigate]);

    return (
        <div className="w-full mx-2 md:max-w-lg md:mx-auto lg:max-w-xl mt-6 p-4 md:p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-lg sm:text-2xl font-bold text-center text-[#5a6f07]">Créer un employé</h1>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Champ Prénom */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Prénom</label>
                    <input {...register('firstName')} type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]" />
                    <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
                </div>

                {/* Champ Nom */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <input {...register('lastName')} type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]" />
                    <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
                </div>

                {/* Date de naissance */}
                <CustomDatePicker name="dateOfBirth" label="Date de naissance" control={control} error={errors.dateOfBirth?.message} />

                {/* Date d'embauche */}
                <CustomDatePicker name="startDate" label="Date d'embauche" control={control} error={errors.startDate?.message} />

                {/* Adresse */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rue</label>
                    <input {...register('street')} type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]" />
                    <p className="text-red-500 text-sm">{errors.street?.message}</p>
                </div>

                {/* Ville */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ville</label>
                    <input {...register('city')} type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]" />
                    <p className="text-red-500 text-sm">{errors.city?.message}</p>
                </div>

                {/* État */}
                <Dropdown
                    name="state"
                    label="État"
                    options={states.map((state) => ({ key: state.abbreviation, value: state.abbreviation, label: state.name }))}
                    control={control}
                    error={errors.state?.message}
                    className="w-full"
                />

                {/* Code postal */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Code postal</label>
                    <input {...register('zipCode')} type="text" className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#5a6f07]" />
                    <p className="text-red-500 text-sm">{errors.zipCode?.message}</p>
                </div>

                {/* Département */}
                <Dropdown
                    name="department"
                    label="Département"
                    options={departments.map((department) => ({ key: department.name, value: department.name, label: department.name }))}
                    control={control}
                    error={errors.department?.message}
                    className="w-full"
                />

                {/* Bouton de validation */}
                <button type="submit" className="w-full bg-[#5a6f07] text-white py-2 rounded hover:bg-[#4e5d06] transition duration-300 ease-in-out">
                    Sauvegarder
                </button>
            </form>

            {/* Modale de confirmation */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} message="Employé ajouté avec succès !" />
        </div>
    );
}

export default CreateEmployeePage;
