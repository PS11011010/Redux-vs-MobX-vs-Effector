import React from 'react';
import { ILevel, IRoot, TSimpleProperty } from '../Data/Interface';
import DataProvider from '../Data/Provider';
import Simple from './Simple';
import '../Home/Micro.css'
import './View.css'

interface ILevelOptions {
    level: IRoot | ILevel
}

const Level = (props: ILevelOptions) => {
    const simpleKeys = DataProvider.getSimpleKeys(props.level);
    const linkKeys = DataProvider.getLinkKeys(props.level);
    const className = `View-Level M-Flex M-FlexColumn View-Level__${props.level.level > 9 ? 9 : props.level.level}`;
    const infoClassName = `View-Level__info ${!props.level.count ? 'View-Level__tail' : ''}`;

    return (
        <div className={className}>
            <div className={infoClassName}>Level: {props.level.level} | Count: {props.level.count}</div>
            <div className="View-Level__simple">
                {
                    simpleKeys.map((simpleKey, i) => <Simple
                        key={i} simpleKey={simpleKey}
                        value={props.level[simpleKey] as TSimpleProperty}
                    />)
                }
            </div>
            <div className="View-Level__link">
                {
                    linkKeys.map((linkKey, i) => <Level
                        key={i}
                        level={props.level[linkKey] as ILevel}
                    />)
                }
            </div>
        </div>
    )
}

export default Level;
