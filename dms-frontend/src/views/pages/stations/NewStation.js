import { useStation } from 'src/hooks';
import StationForm from './StationForm';

function NewStation() {
    const { createStation } = useStation();

    return (
        <StationForm
            title="Add a Station"
            onFormSubmit={createStation}
            successMessage="Station added successfully!"
        />
    )
}

export default NewStation