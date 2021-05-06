import React from "react";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Card, CardBody } from "reactstrap";

export const Tag = ({ tag }) => {
    console.log("Tag: ", tag);
    return (
        <>
            <Card className="m-4">
                <CardBody>
                    <p>
                        <strong>{tag.name}</strong>
                    </p>
                    <Button>
                        <Link className="a" to={`/tag/edit/${tag.id}`}>Edit Tag</Link>
                    </Button>
                    <Button>
                        <Link className="a" to={`/tag/delete/${tag.id}`}>Delete Tag</Link>
                    </Button>
                </CardBody>
            </Card>
        </>
    );
};
export default Tag;