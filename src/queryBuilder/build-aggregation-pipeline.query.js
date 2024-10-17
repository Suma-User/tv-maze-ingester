const buildAggregationPipeline = ({ page, limit, sort, skip }) => {
 

  return [
    {
      $lookup: {
        from: 'cast',
        let: { showCast: '$cast' },
        pipeline: [
          { $match: { $expr: { $in: ['$_id', '$$showCast'] } } },
          { $sort: sort },
          {
            $project: {
              _id : 0,
              id: '$person.id',
              name: '$person.name',
              birthday: '$person.birthday',
            },
          },
        ],
        as: 'Cast',
      },
    },
    {
      $project: {
        _id : 0,
        id: '$id',
        name: 1,
        cast: '$Cast',
      },
    },
    { $skip: skip },
    { $limit: limit },
  ];
};

module.exports = buildAggregationPipeline;
