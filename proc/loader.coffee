console.log "Collecting Resource Data..."
glob = require 'glob'
sizeOf = require 'image-size'
imgdef = require './graphics'

# Get all images in graphics folder
images = glob.sync("graphics/**/*.png")

console.log "Defining spriteData object"
window.spriteData = {}

for image in images
   #Get Image information
   rloc = image.replace 'graphics/', ''
   size = sizeOf image
   data = imgdef[rloc] ||
      name: rloc.replace /\.([^.\n]+)(?!.)/, "" #Remove filetype
      frameSize: [size.width, size.height]
      frameAmount: 1
      center: "center"
   console.log rloc, data

   #Set Sprite Information
   for i in [0...data.frameAmount]
      access =
         if data.frameAmount > 1
            "#{data.name}.#{i}"
         else
            data.name

      window.spriteData[access] =
         src: image
         width: data.frameSize[0]
         height: data.frameSize[1]
         scale: data.scale or [1, 1]
         frameSize: data.frameSize
         frameOffset: [i, 0]
         center:
            if data.center is "center"
               [data.frameSize[0]/2, data.frameSize[1]/2]
            else
               (data.center or [0, 0])

console.log spriteData
