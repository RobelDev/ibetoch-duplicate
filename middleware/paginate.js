import React from "react";

function paginate(model) {
  return (req, res, next) => {
    page = parseInt(req.query.page);
    limit = parseInt(req.query.limit);

    startIndex = (page - 1) * limit;
    endIndex = page * limit;

    const paginated = {};

    if (endIndex < model.length) {
      paginated.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      paginated.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    paginated.propertys = model.slice(startIndex, endIndex);

    res.paginated = paginated;

    next();
  };
}

export default paginate;
