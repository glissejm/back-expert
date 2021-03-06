const { model, Schema } = require('mongoose');

const paymentSchema = new Schema(
  {
    user: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    status: String,
    status_detail: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model('Payment', paymentSchema);
