<script setup>
import { onMounted } from 'vue';
import mapboxgl from 'mapbox-gl';
await nextTick();

definePageMeta({
    layout: 'empty'
});

const mapCenter = ref([]);

onMounted(() => {
    const accessToken = "pk.eyJ1Ijoibmlrb2xhcGFhYWEiLCJhIjoiY2t4NXc5azQ2MTk0ejJvcWtqbmx5ZTkxaiJ9.z9gcfqUSWayg-2cSjUkiag";
    useGatewayFetch('/user/me')
        .then((data) => {
            useGatewayFetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(data.data.value.address)}.json?access_token=${accessToken}`)
                .then((data) => {
                    mapCenter.value = data.data.value.features[0].geometry.coordinates;
                    console.log(mapCenter.value);
                })
        })

    useMapbox('zizizazacaca', (map) => {
        map.setCenter(mapCenter.value);
        const markerRef = defineMapboxMarker('marker1', {}, templateRef, (marker) => {
            console.log(marker);
            // marker.setLngLat(mapCenter.value)
        })
    })
})



// onMounted(async () => {
//     const accessToken = "pk.eyJ1Ijoibmlrb2xhcGFhYWEiLCJhIjoiY2t4NXc5azQ2MTk0ejJvcWtqbmx5ZTkxaiJ9.z9gcfqUSWayg-2cSjUkiag";
//     mapboxgl.accessToken = accessToken;
//     const map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v12',
//         zoom: 12,
//         maxZoom: 17,
//         minZoom: 10
//     })
//     // const popup = new mapboxgl.Popup()
//     //     .setLngLat(['2.262683', '48.777947'])
//     //     .setHTML('test')
//     //     .addTo(map);
//     useGatewayFetch('/user/me')
//         .then((data) => {
//             useGatewayFetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(data.data.value.address)}.json?access_token=${accessToken}`)
//                 .then((data) => {
//                     map.setCenter(data.data.value.features[0].geometry.coordinates);
//                 }).then(() => {
//                     const { data: restaurants } = useGatewayFetch('/restaurant').then((data) => {
//                         let restaurantData = data.data.value;
//                         restaurantData.forEach((restaurant) => {
//                             useGatewayFetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(restaurant.address)}.json?access_token=${accessToken}`)
//                                 .then((data) => {
//                                     const marker = new mapboxgl.Marker({
//                                         color: "#000000",
//                                         draggable: false
//                                     }).setLngLat(data.data.value.features[0].geometry.coordinates)
//                                         .addTo(map);
//                                     marker.getElement().addEventListener('click', () => {
//                                         new mapboxgl.Popup()
//                                             .setLngLat(data.data.value.features[0].geometry.coordinates)
//                                             .setHTML(`<h2>${restaurant.name}</h2><p>${restaurant.address}</p>`)
//                                             .addTo(map);
//                                     });


//                                 })
//                         })
//                     });
//                 })
//         })
// });
</script>

<template>
    <!-- <div>
        <div id='map' style='width: 100%; height: 100vh;'></div>
    </div> -->
    {{ mapCenter  }}
    <div v-if="mapCenter">
        <MapboxMap map-id="zizizazacaca" style="width: 100%;" :options="{
            style: 'mapbox://styles/mapbox/streets-v12', // style URL
            zoom: 5, // starting zoom
            minZoom: 10,
            maxZoom: 17,
        }">
            <MapboxDefaultMarker marker-id="marker1" :options="{}" :lnglat="mapCenter.value">
                <MapboxDefaultPopup popup-id="popup1" :lnglat="mapCenter.value" :options="{
                    closeOnClick: false
                }">
                    <h1 class="test">
                        Hello World!
                    </h1>
                </MapboxDefaultPopup>
            </MapboxDefaultMarker>
        </MapboxMap>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<style scoped>
.mapboxgl-popup {
    max-width: 400px;
    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}
</style>
