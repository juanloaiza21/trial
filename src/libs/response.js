async function errorsResponse(status,errors) {
    let result =  {
      info: {
        status: status,
      },
      errors: [
        errors
      ]
    }
    return result;
}

async function succesResponse(status, data) {
    return {
      info: {
        status: status,
      },
      data: data
    }
}

module.exports={
    errorsResponse,
    succesResponse
}
