import config from '@/config.json'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.tz.setDefault('Asia/Taipei')

for (const scope in config.scopes)
  for (const key in config.scopes[scope])
    if (key.endsWith('_time')) {
      const time = dayjs.tz(config.scopes[scope][key], 'YYYY-MM-DD HH:mm', 'Asia/Taipei')
      config.scopes[scope][key] = time
      config.scopes[scope][key.replace(/^(.*)_time$/, 'is_$1')] = dayjs().isAfter(time)
    }

export default config
