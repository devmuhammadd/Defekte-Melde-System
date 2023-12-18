import { useVehicle } from 'src/hooks';
import VehicleForm from './VehicleForm';

function NewVehicle() {
    const { createVehicle } = useVehicle();

    return (
        <VehicleForm
            title="Add a Vehicle"
            onFormSubmit={createVehicle}
            successMessage="Vehicle added successfully!"
        />
    )
}

export default NewVehicle