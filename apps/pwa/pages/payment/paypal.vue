<script setup>
import { useToast } from "vue-toastification";
await nextTick();

const cookie = useCookie('token');

const addPaypal = async (e) => {
    e.preventDefault();
    const toast = useToast();
    const form = new FormData(e.target);
    let data = Object.fromEntries(form.entries());
    const { data: result, error } = await useFetch('https://api-m.sandbox.paypal.com/v3/vault/setup-tokens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer A21AAL7dvlkmvhsnz08K2RJvS_ofO9uZOXtTMB7RtPkWIQhpKBd1cpHFg7ejP-DyinvUF7WqjLw-OpxBlKg6I3IMnkIUfJMAA',
            'PayPal-Request-Id': Date.now()
        },
        body: {
            "payment_source": {
                "card": {
                    "number": data.cardNumber,
                    "expiry": data.cardExpiry,
                    "name": data.cardName,
                    "billing_address": {
                        "address_line_1": data.address,
                        "postal_code": data.postalCode,
                        "country_code": "FR"
                    },
                    "verification_method": "SCA_WHEN_REQUIRED",
                    "experience_context": {
                        "locale": "fr-FR",
                        "return_url": "https://example.com/returnUrl",
                        "cancel_url": "https://example.com/cancelUrl"
                    }
                }
            }
        }
    })

    if (error.value) {
        toast.error("Erreur lors de l'ajout de la carte");
        return
    }

    if (result.value) {
        const { data: tokenResult, error: error_token } = await useFetch('https://api-m.sandbox.paypal.com/v3/vault/payment-tokens', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer A21AAL7dvlkmvhsnz08K2RJvS_ofO9uZOXtTMB7RtPkWIQhpKBd1cpHFg7ejP-DyinvUF7WqjLw-OpxBlKg6I3IMnkIUfJMAA",
                'PayPal-Request-Id': Date.now()
            },
            body: {
                "payment_source": {
                    "token": {
                        "id": result.value.id,
                        "type": "SETUP_TOKEN"
                    }
                }
            }
        })

        if (error_token.value) {
            toast.error("Erreur lors de l'ajout de la carte");
            return
        }

        if (tokenResult.value) {
            const { data: customerId, pending, refresh } = useGatewayFetch('/user/payment/add', {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    "customerId": tokenResult.value.customer.id
                }
            }).then(() => {
                toast.success("Carte ajoutée avec succès");
            }).catch(() => {
                toast.error("Erreur lors de l'ajout de la carte");
            })
        }
    }
}
</script>

<template>
    <div class="paypalMethod">
        <form @submit="addPaypal($event)">
            <div class="cardNum">
                <label for="cardNumber">Numéro de carte</label>
                <div class="bg-neutral">
                    <i class='bx bxs-credit-card'></i>
                    <input type="text" id="cardNumber" name="cardNumber">
                </div>
            </div>

            <div class="second">
                <div class="cardExp">
                    <label for="cardExpiry">Date d'exp.</label>
                    <div class="bg-neutral mr-2">
                        <input type="month" name="cardExpiry" id="cardExpiry" placeholder="MM/AA">
                    </div>
                </div>
            </div>
            <div class="CarNa">
                <label for="cardName">Nom de la carte</label>
                <input type="text" class="bg-neutral" id="cardName" name="cardName" placeholder="P.ex.: John Doe">
            </div>
            <div class="CarNa">
                <label for="cardName">Adresse</label>
                <input type="text" class="bg-neutral" id="address" name="address" placeholder="P.ex.: 1 rue du test">
            </div>
            <div class="CarNa">
                <label for="cardName">Code postale</label>
                <input type="text" class="bg-neutral" id="postalCode" name="postalCode" placeholder="P.ex.: 92222">
            </div>
            <button type="submit" class="btn btn-neutral">Ajouter</button>
        </form>
    </div>
</template>


<style scoped>
.paypalMethod {
    display: flex;
    justify-content: center;
}

form {
    padding: 2em;
}

.cardNum {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.cardNum label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

.cardNum div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
}

.cardNum div i {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    margin-left: 1rem;
}

.cardNum div input {
    background-color: transparent;
    outline: none;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
}

.second {
    display: flex;
    justify-content: space-between;
}

.second>div {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    width: 100%;
}

.second div label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

.second div div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
}

.second div div i {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    margin-left: 1rem;
    color: black;
}

.second div div input {
    background-color: transparent;
    outline: none;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
}

.CarNa {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
}

.CarNa label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

.CarNa input {
    outline: none;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
}

.btn {
    width: 100%;
    height: 40px;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    margin-top: 1rem;
}
</style>