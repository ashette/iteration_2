<template>
  <div class="admin-content">
    <h1>Заказ №{{ this.$route.params.id }} </h1>
    <v-container
      class="admin-content__container d-flex flex-column elevation-5"
      fluid
    >

    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    order: {
      updatedAt: 1649615356071,
      createdAt: 1649615356071,
      cityId: {
        name: "Санкт-Петербург",
        id: "6005b8f9ad015e0bb6997778",
      },
      pointId: {
        name: "Пункт",
        address: "56 Литейный проспект",
        id: "615ae47018f5c2264119b939",
      },
      carId: {
        description:
          "Пробег до 500 км на одном зараде. Отличный выбор для деловых поездок",
        priceMin: 10000,
        priceMax: 15000,
        name: "Tesla Model S",
        number: "А700АА",
        categoryId: {
          name: "Бизнес",
          description: "Бизнес",
          id: "611171dd2aed9a0b9b8506f9",
        },
        thumbnail: {
          path: require("@/assets/car.jpg"),
          mimetype: "image/jpeg",
          originalname: "karelia.jpg",
          size: 81898,
        },
        tank: 777,
        colors: ["Синий", "Алый", "Белый", "Синий"],
        id: "600ff1f6ad015e0bb6997d65",
      },
      color: "Синий",
      dateFrom: 1649620800000,
      dateTo: 1649707200000,
      rateId: {
        rateTypeId: {
          unit: "мин",
          name: "Поминутно",
          id: "5e26a07f099b810b946c5d82",
        },
        price: 7,
        id: "61af4296bb7a006c05c54c4b",
      },
      price: 10280,
      isNeedChildChair: true,
      orderStatusId: {
        name: "Новые",
        id: "5e26a191099b810b946c5d89",
      },
      id: "625321fc73b61100181024d6",
    },
  }),
};
</script>


