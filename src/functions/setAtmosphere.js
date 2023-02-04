export const setAtmosphere = (num) => {
	if(num < 50){
		return "しっぽり会話を楽しみながら飲みたい！"
	}else if(num > 50){
		return "ワイワイ騒ぎながら飲みたい！"
	}else{
		return "静かすぎず、騒ぎすぎず、程よく飲みたい!"
	}
}
