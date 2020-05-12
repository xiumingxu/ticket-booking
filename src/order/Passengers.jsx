/* eslint-disable react/display-name */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './Passengers.css';

const Passenger = memo(props => {
    const {
        id,
        name,
        followAdultName,
        ticketType,
        licenceNo,
        gender,
        birthday,
        onRemove,
        onUpdate,
        showGenderMenu,
        showFollowAdultMenu,
        showTicketTypeMenu
    } = props;

    const isAdult = ticketType === 'adult';

    return (
        <li className="passenger">
            <i className="delete" onClick={() => onRemove(id)}>
                —
            </i>
            <ol className="items">
                <li className="item">
                    <label className="label name">姓名</label>
                    <input
                        type="text"
                        className="input name"
                        placeholder="乘客姓名"
                        value={name}
                        onChange={e => onUpdate(id, { name: e.target.value })}
                    />
                    <label className="ticket-type" onClick={() => showTicketTypeMenu(id)}>
                        {isAdult ? 'Adult Ticket' : 'Children Ticket'}
                    </label>
                </li>
                {isAdult && (
                    <li className="item">
                        <label className="label licenceNo">身份证</label>
                        <input
                            type="text"
                            className="input licenceNo"
                            placeholder="证件号码"
                            value={licenceNo}
                            onChange={e => onUpdate(id, { licenceNo: e.target.value })}
                        />
                    </li>
                )}
                {!isAdult && (
                    <li className="item arrow">
                        <label className="label gender">Gender</label>
                        <input
                            type="text"
                            className="input gender"
                            placeholder="请选择"
                            onClick={() => showGenderMenu(id)}
                            value={gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : ''}
                            readOnly
                        />
                    </li>
                )}
                {!isAdult && (
                    <li className="item">
                        <label className="label birthday">Birthday</label>
                        <input
                            type="text"
                            className="input birthday"
                            placeholder="Ex 19951015"
                            value={birthday}
                            onChange={e => onUpdate(id, { birthday: e.target.value })}
                        />
                    </li>
                )}
                {!isAdult && (
                    <li className="item arrow">
                        <label className="label followAdult">同行成人</label>
                        <input
                            type="text"
                            className="input followAdult"
                            placeholder="请选择"
                            value={followAdultName}
                            onClick={() => showFollowAdultMenu(id)}
                            readOnly
                        />
                    </li>
                )}
            </ol>
        </li>
    );
});
Passenger.propTypes = {};

const Passengers = memo(props => {
    const { passengers, createAdult, createChild, removePassenger } = props;
    return (
        <div className="passengers">
            <ul>
                {passengers.map(passenger => {
                    return <Passenger onRemove={removePassenger} {...passenger} />;
                })}
            </ul>
            {/* add button to add children/adults */}
            <section className="add">
                <div
                    className="adult"
                    onClick={() => {
                        createAdult();
                    }}>
                    Add Adult
                </div>
                <div className="child" onClick={() => createChild()}>
                    Add Child
                </div>
            </section>
        </div>
    );
});

Passengers.propTypes = {
    passengers : PropTypes.array.isRequired
};

export default Passengers;
