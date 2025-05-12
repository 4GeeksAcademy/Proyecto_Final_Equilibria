import React, { useContext, useState } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";



const Checkout = ({ onSuccess }) => {
    // Accede al estado del SDK de PayPal
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);
    const { actions: fluxActions } = useContext(Context);
    const navigate = useNavigate();


    // Maneja el cambio de divisa y recarga el SDK
    const onCurrencyChange = ({ target: { value } }) => {
        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: { ...options, currency: value },
        });
    };

    // Crea la orden de pago
    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "5.99", // Monto a cobrar
                    },
                },
            ],
        });
    };

    // Maneja la aprobación y captura el pago
    const onApproveOrder = async (data, actions) => {
        try {
            const details = await actions.order.capture();
            if (details.status === "COMPLETED") {
                // Llama a la acción global para convertir al usuario en premium
                const success = await fluxActions.convertirPremium();
                if (success) {
                    onSuccess();
                    alert("¡Felicidades! Ahora eres un usuario premium.");
                    navigate("/dashboard"); 
                } else {
                    alert("Algo salió mal al actualizar tu estado premium. Intenta de nuevo.");
                }
            }
        } catch (error) {
            console.error("Error al procesar el pago:", error);
            alert("Hubo un problema al procesar tu pago. Por favor, intenta de nuevo.");
        }
    };

    return (
        <div>
            {isPending ? (
                <p>CARGANDO...</p>
            ) : (
                <>
                    <div style={{ marginBottom: "1rem" }}>
                        <label htmlFor="currency">Moneda:&nbsp;</label>
                        <select id="currency" value={currency} onChange={onCurrencyChange}>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={onCreateOrder}
                        onApprove={onApproveOrder}
                    />
                </>
            )}
        </div>
    );
};

export default Checkout;
