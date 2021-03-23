import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from "../../../axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            contry : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            zipCode : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            email : {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },

            deliveryMethod : {
                elementType: 'select',
                elementConfig: {
                  options: [
                      {value: 'fastest', displayValue: 'Fastest'},
                      {value: 'cheapest', displayValue: 'Cheapest'}
                  ]
                },
                value: ''
            }
            
        },
        loading: false
        
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

       const updatedOrderFormElement =  {

           ...updatedOrderForm[inputIdentifier]
       };
       
       updatedOrderFormElement.value = event.target.value;

       updatedOrderForm[inputIdentifier] = updatedOrderFormElement;

       this.setState({orderForm: updatedOrderForm});

    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        
        const formData = {};
        
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }


        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            orderData: formData

        };
        
        axios.post('/orders.json', order)
            .then(response => console.log(response))
            .catch(error => console.log(error))
            .finally(() => {
                this.setState({loading: false, purchasing: false});
                this.props.history.push('/');
            })

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
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />;

                    })}
                    <Button  btnType="Success">Order</Button>
                </form>
            </div>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }
        return form;
    }
}

export default ContactData;