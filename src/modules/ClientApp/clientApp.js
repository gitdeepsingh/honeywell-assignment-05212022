import React, { Component } from 'react';

import './clientApp.css'

const baseUrl = 'http://localhost:4200';
class ClientApp extends Component {
    constructor() {
        super()
        this.state = {
            inventory: [],
            cartValue: 0,
            loading: false,
            serviceError: false
        }
        this.cart = [];
    }

    componentDidMount() {
        this.fetchInventor()
    }

    fetchInventor = () => {
        this.setState({ loading: true })
        fetch(`${baseUrl}/inventory`)
            .then(response => response.json())
            .then(data => {
                this.setState({ inventory: data?.data || [] })
            }).catch(error => {
                this.setState({ serviceError: true })
            }).finally(() => {
                this.setState({ loading: false })
            })
    }

    isItemInCart = (item) => {
        return this.cart.includes(item)
    }

    onAdd = (item) => {
        this.cart.push(item)
        this.setState((prev) => {
            return {
                cartValue: prev.cartValue + 1
            }
        })
    }

    onRemove = (item) => {
        const { cartValue } = this.state;
        if (this.isItemInCart(item) && cartValue > 0) {
            this.setState((prev) => {
                return {
                    cartValue: prev.cartValue - 1
                }
            }, () => {
                this.cart.splice(this.cart.findIndex(c => c.id === item.id), 1)
            })
        }

    }

    renderInventoryList = () => {
        const { inventory } = this.state;
        return inventory?.map((item, index) => {
            return <div className={`inventory-item ${this.isItemInCart(item) ? "cart-item" : ""}`}>
                <div>
                    {item?.title || item?.subtitle || '-'}
                </div>
                <div>
                    Price: Rs. {item?.price || '-'}
                </div>
                <button onClick={() => this.onAdd(item)}>ADD</button>
                <button onClick={() => this.onRemove(item)}>REMOVE</button>
            </div>

        })
    }

    renderResults = () => {
        const { cartValue, inventory } = this.state;
        return <>
            <div className='inventory-list-viewer'>
                {inventory.length > 0 ? this.renderInventoryList() : <>No items available at the moment!</>}
            </div>
            <div className='cart'>
                <div> &#8371; CART</div>
                <div>{cartValue}</div>
            </div>
        </>
    }

    render() {
        const { loading, serviceError } = this.state;
        return (
            <>
                {loading ? <div>Loading. Please wait...</div> : (serviceError ? <div>Hmm! Looks like something is not working. Please try after some time.</div> : (
                    this.renderResults()
                ))}

            </>
        )
    }
}

export default ClientApp;