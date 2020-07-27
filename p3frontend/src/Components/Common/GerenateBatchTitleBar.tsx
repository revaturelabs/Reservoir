import React from "react";
import { Container } from 'reactstrap';

interface IPageTitleBarProps {
    pageTitle: string;
    setView: any;
    setActive: any;
    active: any;
}
export const GerenateBatchTitleBar = (props: IPageTitleBarProps) => {

    return (
        <div>
            <div className="row page-title-bar">
                <Container>
                    <p onClick={() => props.setView(1)} onMouseDown={() => { props.setActive(1) }} id={!props.active ? "" : "generate-new-batch-active"}
                        className="float-right generate-batch-nav-link">Finalize A Batch</p>

                    <p onClick={() => props.setView(0)} onMouseDown={() => { props.setActive(0) }} id={!props.active ? "generate-new-batch-active" : ""}
                        className="float-right generate-batch-nav-link">Initialize A Batch</p>

                    <div className="middle-text">{props.pageTitle}</div>

                </Container>
            </div >

        </div >
    );
}