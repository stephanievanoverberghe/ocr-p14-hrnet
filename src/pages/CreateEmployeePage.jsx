import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Définition du schéma de validation avec Yup
const employeeSchema = yup.object().shape({
    firstName: yup.string().required('Le prénom est requis'),
    lastName: yup.string().required('Le nom est requis'),
    dateOfBirth: yup.date().required('La date de naissance est requise'),
    startDate: yup.date().required("La date d'embauche est requise"),
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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(employeeSchema),
    });

    const onSubmit = (data) => {
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        employees.push(data);
        localStorage.setItem('employees', JSON.stringify(employees));
        navigate('/list');
    };

    return (
        <div className="w-[600px] mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center text-[#5a6f07]">Créer un employé</h1>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input {...register('firstName')} type="text" placeholder="Prénom" className="w-full p-2 border rounded" />
                    <p className="text-red-500 text-sm">{errors.firstName?.message}</p>
                </div>
                <div>
                    <input {...register('lastName')} type="text" placeholder="Nom" className="w-full p-2 border rounded" />
                    <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
                </div>
                <div>
                    <input {...register('dateOfBirth')} type="date" className="w-full p-2 border rounded" />
                    <p className="text-red-500 text-sm">{errors.dateOfBirth?.message}</p>
                </div>
                <div>
                    <input {...register('startDate')} type="date" className="w-full p-2 border rounded" />
                    <p className="text-red-500 text-sm">{errors.startDate?.message}</p>
                </div>
                <div>
                    <input {...register('street')} type="text" placeholder="Rue" className="w-full p-2 border rounded" />
                    <p className="text-red-500 text-sm">{errors.street?.message}</p>
                </div>
                <div>
                    <input {...register('city')} type="text" placeholder="Ville" className="w-full p-2 border rounded" />
                    <p className="text-red-500 text-sm">{errors.city?.message}</p>
                </div>
                <div>
                    <input {...register('state')} type="text" placeholder="État" className="w-full p-2 border rounded" />
                    <p className="text-red-500 text-sm">{errors.state?.message}</p>
                </div>
                <div>
                    <input {...register('zipCode')} type="text" placeholder="Code postal" className="w-full p-2 border rounded" />
                    <p className="text-red-500 text-sm">{errors.zipCode?.message}</p>
                </div>
                <div>
                    <select {...register('department')} className="w-full p-2 border rounded">
                        <option value="Sales">Ventes</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Engineering">Ingénierie</option>
                        <option value="Human Resources">Ressources humaines</option>
                        <option value="Legal">Juridique</option>
                    </select>
                    <p className="text-red-500 text-sm">{errors.department?.message}</p>
                </div>
                <button type="submit" className="w-full bg-[#5a6f07] cursor text-white py-2 rounded">
                    Sauvegarder
                </button>
            </form>
        </div>
    );
}

export default CreateEmployeePage;
