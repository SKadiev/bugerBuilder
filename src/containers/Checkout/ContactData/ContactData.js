import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {

    state = {
        orderForm: {
            name : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            street : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false

            },
            contry : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false


            },
            zipCode : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false


            },
            email : {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false


            },

            deliveryMethod : {
                elementType: 'select',
                elementConfig: {
                  options: [
                      {value: 'fastest', displayValue: 'Fastest'},
                      {value: 'cheapest', displayValue: 'Cheapest'}
                  ]
                },
                value: 'fastest',
                validation: {},
                valid: true


            }
            
        },
        formIsValid: false
        
    }

    checkValidity (value, rules) {
        let  isValid = true;


        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength  && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

       const updatedOrderFormElement =  {

           ...updatedOrderForm[inputIdentifier]
       };
       
       updatedOrderFormElement.value = event.target.value;
       updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation);
       updatedOrderFormElement.touched = true;
       updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
       
       let formIsValid = true;

       for (let inputIdentifier in updatedOrderForm) {

           formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;

       }

       this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

    }

    orderHandler = (event) => {
        event.preventDefault();
        
        const formData = {};
        
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }


        const order = {
            ingredients: this.props.ings,
            totalPrice: this.props.price,
            orderData: formData

        };

        this.props.onOrderBurger(order);
        

    }
    

    render() {
        const formElements = [];

        for (const key in this.state.orderForm) {
            if (Object.hasOwnProperty.call( this.state.orderForm, key)) {
                const elementConfig = this.state.orderForm[key];
                formElements.push({
                    id: key,
                    config: elementConfig,
                    label: key
                })
                
            }
        }

        let form = (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form onSubmit={this.orderHandler}>
                    {formElements.map(formElement => {
                        return <Input 
                            key={formElement.id}
                            label={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}
                            shouldValidate={formElement.config.validation}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />;

                    })}
                    <Button  btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
                </form>
            </div>
        );

        if (this.props.loading) {
            form = <Spinner />;
        }
        return form;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));