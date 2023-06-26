<template>
    <form>
        <div class="cardNum">
            <label for="cardNumber">Numéro de carte</label>
            <div class="bg-neutral">
                <i class='bx bxs-credit-card'></i>
                <input type="text" id="cardNumber">
            </div>
        </div>

        <div class="second">
            <div class="cardExp">
                <label for="cardExpiry">Date d'exp.</label>
                <div class="bg-neutral mr-2">
                    <input  type="text" id="cardExpiry" placeholder="MM/AA">
                    <i class='bx bxs-help-circle'></i>
                </div>
            </div>
            <div class="cardCvc">
                <label for="cardCVC">Code de sécurité</label>
                <div class="bg-neutral">
                    <input type="text" id="cardCVC" placeholder="123">
                    <i class='bx bxs-help-circle'></i>
                </div>
            </div>
        </div>
        <div class="CarNa">
            <label for="cardName">Nom de la carte</label>
            <input type="text" class="bg-neutral" id="cardName" placeholder="P.ex.: John Doe">

        </div>
        <button type="submit" class="btn btn-neutral">Ajouter</button>
    </form>
</template>

<style scoped>
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

.second > div {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
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