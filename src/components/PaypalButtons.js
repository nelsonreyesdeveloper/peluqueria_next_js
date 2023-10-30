"use client"
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify"
import { usePeluqueriaContext } from "@/context/PeluqueriaProvider";
function PaymentPage() {
    const { total, handleConfirmarCita, limpiarForm } = usePeluqueriaContext()

    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: total,
                        },
                    },
                ],
            })

    };

    const onApprove = (data, actions) => {
        const metodo = (data.paymentSource) == "paypal" ? 3 : 2;

        return actions.order.capture().then(async function (details) {
            const name = details.payer.name.given_name;

            const error = await handleConfirmarCita(metodo)
            if (error == 400) return;

            alert("Transancion completado por " + name);
            limpiarForm()
        });
    }

    const onCancel = (data, actions) => {
        // console.log(total);
        // console.log('OnCancel', data, actions);
    }

    return (
        <div className="z-50">
            {/* Otros elementos de la página */}
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} onCancel={onCancel} forceReRender={[total]} />
        </div>
    );
}

export default PaymentPage;