import { Label } from "semantic-ui-react";


const Elevator = ({ elevatorName, position }) => {
    return (<>
        <Label>
            {`Elevator ${elevatorName}. Current floor: ${position}`}
        </Label>
    </>)
}

export default Elevator;
