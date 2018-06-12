import './button_vis.less';

import optionsTemplate from './button_vis_options.html';
import { VisController } from './button_vis_controller';

import { CATEGORY } from 'ui/vis/vis_category';
import { VisFactoryProvider } from 'ui/vis/vis_factory';
import { Schemas } from 'ui/vis/editors/default/schemas';
import { VisTypesRegistryProvider } from 'ui/registry/vis_types';
import { VisSchemasProvider } from 'ui/vis/editors/default/schemas';

function ButtonVisProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);

  return VisFactory.createBaseVisualization({
    name: 'button_vis',
    title: 'Button Vis',
    icon: 'fa fa-gear',
    description: 'An actionable button',
    category: CATEGORY.OTHER,
    visualization: VisController,
    visConfig: {
      defaults: {
        fontSize: '30',
        margin: '10',
        buttonTitle: 'Click me!',
        code: ' ',
      },
    },
    editorConfig: {
      optionsTemplate: optionsTemplate,
      schemas: new Schemas([
        {
          group: 'metrics',
          name: 'metric',
          title: 'Metric',
          min: 1,
          aggFilter: ['!derivative', '!geo_centroid'],
          defaults: [
            { type: 'count', schema: 'metric' }
          ]
        }, {
          group: 'buckets',
          name: 'segment',
          title: 'Bucket Split',
          min: 0,
          max: 1,
          aggFilter: ['!geohash_grid', '!filter']
        }
      ]),
    }
  });
}

// register the provider with the visTypes registry
VisTypesRegistryProvider.register(ButtonVisProvider);

// export the provider so that the visType can be required with Private()
//export default ButtonVisProvider;