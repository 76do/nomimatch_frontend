export const setAtmosphere = (num) => {
	if(num < 34){
		return "しっぽり会話を楽しみながら飲みたい！"
	}else if(num > 66){
		return "ワイワイ騒ぎながら飲みたい！"
	}else{
		return "静かすぎず、騒ぎすぎず、程よく飲みたい!"
	}
}
