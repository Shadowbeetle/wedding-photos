#!/usr/bin/env bash
> server/models/metadata/photos.yaml

all=$(ls images/original | wc -l | tr -d '[:space:]')
c=0
for file in images/original/*; do
  dimensions=$(identify -format "%[fx:w]x%[fx:h]" "$file")
  width=$(tr 'x' '\n' <<< $dimensions | head -n 1)
  height=$(tr 'x' '\n' <<< $dimensions | tail -n 1)
  thumbnail_target_height=250
  large_target_height=850
  thumbnail_target_width=$(bc <<< "$width*$thumbnail_target_height/$height")
  large_target_width=$(bc <<< "$width*$large_target_height/$height")
  filename=$(basename "$file")
  thumbnail_path="images/thumbnails/$filename"
  large_path="images/large/$filename"
  convert "$file" -resize "$thumbnail_target_width"x"$thumbnail_target_width" "$thumbnail_path"
  convert "$file" -resize "$large_target_width"x"$large_target_width" "$large_path"
  thumbnail_dimensions=$(identify -format "%[fx:w]x%[fx:h]" "$thumbnail_path")
  thumbnail_width=$(tr 'x' '\n' <<< $thumbnail_dimensions | head -n 1)
  thumbnail_height=$(tr 'x' '\n' <<< $thumbnail_dimensions | tail -n 1)
  aws s3 cp "$thumbnail_path" s3://anna-tamas-eskuvo/professional/photos/thumbnails/ --metadata height=$thumbnail_height,width=$thumbnail_width
  echo "$filename: { width: $thumbnail_width, height: $thumbnail_height }" >> server/models/metadata/photos.yaml
  c=$(($c+1))
  echo -ne "\r$c / $all"
done
echo ""
ruby -ryaml -rjson -e 'puts JSON.pretty_generate(YAML.load(ARGF))' < server/models/metadata/photos.yaml > server/models/metadata/photos.json
