import { Payment } from "../models/payment.model";
const mercadopago = require("mercadopago");

export async function processPayment(req, res) {
    try {
        mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN_MP);
        
        const payment_data = {
            transaction_amount: req.body.transaction_amount,
            token: req.body.token,
            description: req.body.description,
            installments: Number(req.body.installments),
            payment_method_id: req.body.paymentMethodId,
            issuer_id: req.body.issuer,
            payer: {
                email: req.body.payer.email,
                identification: {
                    type: req.body.payer.docType,
                    number: req.body.payer.docNumber,
                },
            },
        };
        mercadopago.payment
        .save(payment_data)
        .then((response) => {
            return res.status(response.status).json({
                status: response.body.status,
                status_detail: response.body.status_detail,
                id: response.body.id,
            });
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
    } catch (e) {
        return res.status(500).send(err);
    }
  }