import { useRef, useState } from 'react';
import classes from './CheckOut.module.css';

const Checkout = (props) => {

    const isEmpty = value => value.trim() === '';
    const isSixChars = value => value.trim().length === 6;

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();
    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = isSixChars(enteredPostal);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid
        })
        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;
        if (!formIsValid) {
            return;
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity
        });
    };
    const nameControlClass = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
    const streetControlClass = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
    const postalControlClass = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`
    const cityControlClass = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClass}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name.</p>}
            </div>
            <div className={streetControlClass}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please enter a valid street.</p>}
            </div>
            <div className={postalControlClass}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!formInputsValidity.postalCode && <p>Please enter a valid postalCode.</p>}
            </div>
            <div className={cityControlClass}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city.</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel} className={classes.cancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;