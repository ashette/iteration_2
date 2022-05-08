export const castAuth = (authData) => {
    return {
        accessToken: authData.access_token,
        refreshToken: authData.refresh_token,
    }
}

export const castOrder = (orderData) => {
    return {
        orderStatusId: orderData.orderStatusId ? orderData.orderStatusId.id : '',
        color: orderData.color,
        cityId: orderData.cityId ? orderData.cityId.id : '',
        carId: orderData.carId ? orderData.carId.id : '',
        dateFrom: new Date(orderData.dateFrom),
        dateTo: new Date(orderData.dateTo),
        pointId: orderData.pointId ? orderData.pointId.id : '',
        rateId: orderData.rateId ? orderData.rateId.id : '',
        price: orderData.price,
        isFullTank: orderData.isFullTank,
        isNeedChildChair: orderData.isNeedChildChair,
        isRightWheel: orderData.isRightWheel
    }
}

export const castRate = (rateData) => {
    return {
        id: rateData.id,
        price: rateData.price,
        rateTypeId: rateData.rateTypeId ? rateData.rateTypeId.id : '',
        name: rateData.rateTypeId ? rateData.rateTypeId.name : '',
        unit: rateData.rateTypeId ? rateData.rateTypeId.unit : '',
    }
}

export const castCar = (carData) => {
    return {
        id: carData.id,
        categoryId: carData.categoryId ? carData.categoryId.id : '',
        currentCategoryName: carData.categoryId ? carData.categoryId.name : '',
        description: carData.description,
        colors: carData.colors,
        name: carData.name,
        number: carData.number,
        priceMax: carData.priceMax,
        priceMin: carData.priceMin,
        tank: carData.tank,
        thumbnailPath: carData.thumbnail ? carData.thumbnail.path : ''
    }
}