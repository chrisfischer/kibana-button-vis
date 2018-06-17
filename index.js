
export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'button_vis',
    uiExports: {
      visTypes: [
        'plugins/button_vis/button_vis'
      ]
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

  });
};
