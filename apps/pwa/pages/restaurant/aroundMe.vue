<script setup>
import { onMounted } from 'vue';
import mapboxgl from 'mapbox-gl';
await nextTick();

definePageMeta({
    layout: 'empty'
});

onMounted(async () => {
    const accessToken = "pk.eyJ1Ijoibmlrb2xhcGFhYWEiLCJhIjoiY2t4NXc5azQ2MTk0ejJvcWtqbmx5ZTkxaiJ9.z9gcfqUSWayg-2cSjUkiag";
    mapboxgl.accessToken = accessToken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        zoom: 12,
        maxZoom: 17,
        minZoom: 10
    })
    useGatewayFetch('/user/me')
        .then((data) => {
            useGatewayFetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(data.data.value.address)}.json?access_token=${accessToken}`)
                .then((data) => {
                    map.setCenter(data.data.value.features[0].geometry.coordinates);
                }).then(() => {
                    const { data: restaurants } = useGatewayFetch('/restaurant').then((data) => {
                        let restaurantData = data.data.value;
                        restaurantData.forEach((restaurant) => {
                            useGatewayFetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(restaurant.address)}.json?access_token=${accessToken}`)
                                .then((data) => {
                                    const marker = new mapboxgl.Marker({
                                        color: "#000000",
                                        draggable: false
                                    }).setLngLat(data.data.value.features[0].geometry.coordinates)
                                        .addTo(map);
                                    const popup = new mapboxgl.Popup()
                                        .setLngLat(data.data.value.features[0].geometry.coordinates)
                                        .setHTML(`
                                            <h1 class="text-black text-[16px]">${restaurant.name}</h1>
                                            <p class="text-black text-[14px] mt-2">${restaurant.address}</p>
                                            <a class="text-black" href="/restaurant/${restaurant.id}"><button class="btn bg-neutral seeResto mt-2">Voir le restaurant</button></a>
                                        `)
                                    marker.setPopup(popup);
                                    marker.on('click', () => {
                                        popup.addTo(map);
                                    })
                                })
                        })
                    });
                })
        })
});
</script>

<template>
    <div>
        <div id='map' class="map-container" style='width: 100%; height: 100vh;'></div>
        <NuxtLink to="/"><button class="go-back-button">Go Back</button></NuxtLink>
    </div>
</template>

<style>
.mapboxgl-popup-close-button {
    width: 25px;
    height: 25px;
    color: black;
    border-radius: 0px 10px 0px 0px;
}

.mapboxgl-popup-content {
    border-radius: 10px;
}

.seeResto {
    font-size: 12px;
    padding: 8px;
    height: auto;
    min-height: auto;
}

#map {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
}

.map-container {
    width: 100%;
    height: 100vh;
}

.go-back-button {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1;
    padding: 10px;
    background-color: black;
    border-radius: 10px;
    color: white;
}
</style>
