<CRUD {data} />
<!-- <CRUD data={option} /> -->

<script>
  import { writable } from 'svelte/store'
  import { offlineData } from './data'
  import CRUD from '../base/crud'
  import 'dayjs/locale/ru'
  import dayjs from 'dayjs'
  import { query } from 'api.js'
  import Custom from './Custom.svelte'
  import DatePickerFilter from './DatePickerFilter.svelte'
  import Slider from 'co/base/slider/index.svelte'
  const option = {
    rows$: writable(offlineData.data.products),
    columns: [
      {
        name: 'id',
        title: 'Ид',

        value: model => model.id,
      },
      { name: 'rest', title: 'Остаток', component: Custom },
      {
        name: 'created_at',

        title: 'Создана',
        value: row => dayjs(row.created_at).format('DD-MM-YYYY HH:mm:ss'),
      },
      {
        name: 'product_colors',
        fields: ['color_id'],
        value: row => {
          let val = ''
          for (let index = 0; index < row.product_colors.length; index++) {
            val += ' ' + row.product_colors[index].color_id
          }
          return val
        },
        title: 'Ид цвета',
      },
      {
        name: 'product_locales',
        fields: ['name', 'description'],
        value: row => row.product_locales[0].name,
        title: 'Название',
      },
      {
        name: 'product_images',
        component: Slider,
        props: row => ({
          images: [...row.product_images],
        }),
        fields: ['name', 'extension', 'image', 'alt', 'id', 'is_main'],
        title: 'Изображение',
      },
    ],
  }

  const data = {
    queryName: 'products',
    pagination: {
      limit: 15,
    },
    create: true,
    actions: {
      title: 'Действия',
      update: true,
      delete: true,
    },
    columns: [
      {
        name: 'id',
        title: 'Ид',
        sort: is_desc => ({
          id: is_desc ? 'desc' : 'asc',
        }),
        value: model => model.id,
        filter: {
          query: value => ({
            product_locales: {
              name: { _ilike: `%${value}%` },
            },
          }),
          placeholder: 'Название',
        },
      },
      { name: 'rest', title: 'Остаток', component: Custom },
      {
        name: 'created_at',

        title: 'Создана',
        value: row => dayjs(row.created_at).format('DD-MM-YYYY HH:mm:ss'),
        filter: { options: { column: 'span 2' }, component: DatePickerFilter },
      },
      {
        name: 'product_colors',
        fields: ['color_id'],
        value: row => {
          let val = ''
          for (let index = 0; index < row.product_colors.length; index++) {
            val += ' ' + row.product_colors[index].color_id
          }
          return val
        },
        title: 'Ид цвета',
      },
      {
        name: 'product_locales',
        fields: ['name', 'description'],
        value: row => row.product_locales[0].name,
        title: 'Название',
      },
      {
        name: 'product_images',
        component: Slider,
        props: row => ({
          images: [...row.product_images],
        }),
        fields: ['name', 'extension', 'image', 'alt', 'id', 'is_main'],
        title: 'Изображение',
      },
    ],
    formBuilder: {
      columns: 'repeat(3,1fr)',

      fields: [
        {
          type: 'tabs',
          title: 'Локализация',
          name: 'product_locales',
          flow: 'column',
          options: {
            column: 'span 1',
            flow: 'column',
            gap: '5px',
          },
          labels: ['ru', 'uz', 'en'],
          args: [{ name: 'locales_id', value: 1 }, { name: 'locales_id', value: 2 }, { name: 'locales_id', value: 3 }],
          fields: [
            {
              required: true,
              fill: 'red',
              type: 'text',
              name: 'description',
              label: 'Описание',
              placeholder: 'Описание',
            },
            {
              required: true,
              type: 'text',
              name: 'name',
              label: 'Название',
              placeholder: 'Название',
            },
          ],
        },
        {
          type: 'fieldset',
          options: {
            row: 'span 2',
            gap: 1,
            flow: 'column',
          },
          fields: [
            {
              required: true,
              type: 'number',
              name: 'price',
              label: 'Цена',
              placeholder: 'Цена',
            },
            {
              required: true,
              type: 'number',
              name: 'price',
              label: 'Цена',
              placeholder: 'Цена',
            },
            {
              required: true,
              type: 'number',
              name: 'old_price',
              label: 'Старая цена',
              placeholder: 'Старая цена',
            },
            {
              required: true,
              type: 'number',
              name: 'discount',
              value: 0,
              label: 'Скидка',
              placeholder: 'Скидка',
            },
            {
              required: true,
              type: 'number',
              name: 'charge',
              min: 1,
              value: 1,
              label: 'Наценка',
              placeholder: 'Наценка',
            },
            {
              required: true,
              type: 'number',
              name: 'rest',
              value: 5,
              label: 'Остаток',
              placeholder: 'Остаток',
            },
          ],
        },
        {
          required: true,
          group: 'text',
          type: 'text',
          name: 'article',
          label: 'Артикул | модель',
          placeholder: 'Артикул',
        },
        {
          type: 'fieldset',
          options: {
            gap: 1,
            flow: 'column',
          },
          fields: [
            {
              required: true,
              type: 'dropdown',
              name: 'brand_id',
              label: 'Бренд',
              placeholder: 'Выберите бренд',
              data: {
                preload: type => query('BRANDS'),
                name: 'BRANDS',
              },
            },
            {
              required: true,
              type: 'dropdown',
              name: 'product_colors',
              fields: ['color_id'],
              multiple: true,
              label: 'Цвет',
              placeholder: 'Выберите Цвет',
              data: {
                preload: type => query('COLORS'),
                fieldName: 'color_locales.name',
                foreign_key: 'color_id',
                name: 'COLORS',
              },
            },
            {
              required: true,
              type: 'dropdown',
              options: {
                column: 'span 3',
              },
              name: 'categories_products',
              fields: ['category_id'],
              label: 'Категория',
              placeholder: 'Выберите категория',
              data: {
                preload: type => query('CATEGORIES'),
                fieldName: 'category_locales.name',
                foreign_key: 'category_id',
                name: 'CATEGORIES',
              },
            },
          ],
        },
        {
          options: {
            column: 'span 3',
          },
          required: true,
          type: 'image',
          name: 'product_images',

          multiple: true,
          fields: ['name', 'extension', 'image', 'alt', 'id', 'is_main'],
          label: 'Изображение',
          placeholder: 'Изображение',
        },
      ],
    },
  }
</script>
