import { Button, Icon, Label } from "semantic-ui-react"

const Floor = ({ floorNumber, callElevator }) => {


    return (<div style={{ display: 'flex', alignItems: 'center' }}>
        <Label>{`Floor: ${floorNumber}`}</Label>
        {
            floorNumber < 6 ?
                <Button icon onClick={callElevator}>
                    <Icon name="arrow alternate circle up" size="large" />
                </Button> :
                <Button icon style={{ visibility: 'hidden' }}>
                    <Icon size="large" />
                </Button>
        }
        {
            floorNumber > 0 ?
                <Button icon onClick={callElevator}>
                    <Icon name="arrow alternate circle down" size="large" />
                </Button> :
                <Button icon style={{ visibility: 'hidden' }}>
                    <Icon size="large" />
                </Button>
        }

    </div>)
}

export default Floor;
