function successResponse (msg, result) {
  if (!result) {
    return { code : 0, msg } 
  } else {
    return { code: 0, msg, result }
  }
}

function errorResponse (msg) {
  // 定义多种 code 类型
  return {
    code: 1,
    msg
  }
}

module.exports = {
  successResponse,
  errorResponse
}