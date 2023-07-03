<template>
    <h1>Moyens de paiements</h1>
    <div>
        <button class="btn  btn-neutral" onclick="my_modal_1.showModal()">Ajoutez un moyen de paiement</button>
        <dialog id="my_modal_1" class="modal">
            <form method="dialog" class="modal-box">
                <h3 class="font-bold text-lg">Ajoutez un moyen de paiement!</h3>
                <div class="flex flex-col ">
                    <NuxtLink to="/payment/paypal" class="mt-4">
                        <i class='bx bxl-paypal'></i>
                        Carte de crédit ou de débit
                    </NuxtLink>
                </div>
                <div class="modal-action">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-neutral">Close</button>
                </div>
            </form>
        </dialog>
    </div>
</template>