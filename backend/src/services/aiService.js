const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
});

exports.analyzeProperty = async(propertyData)=>{
    try{
        const prompt = ` Assume typical urban real estate trends.
Provide heuristic, non-authoritative estimates for decision support only.

Analyze the following property and respond in STRICT JSON format.
      
      Property Details:
      - Location: ${propertyData.location}
      - Type: ${propertyData.type}
      - Price: ${propertyData.price}
      - Size: ${propertyData.size} sqft
      - Bedrooms: ${propertyData.bedrooms}
      - Features: ${(propertyData.features||[]).join(', ')}
      Return JSON with this structure:
      {
        "valuation": {
          "estimatedValue": Number,
          "marketTrend": "Upward" |"Stable" | "Downward",
          "confidence": Number (0-100 score)
        },
        "analysis": {
          "summary": String (short executive summary),
          "investmentScore": Number (0-10),
          "pros": [String array of positive points],
          "cons": [String array of negative points or risks]
        }
      }
    `;
    const completion = await openai.chat.completions.create({
       model:"gpt-4o-mini",
        messages:[{role:'user',content:prompt}],
       
        response_format:{type:'json_object'},
    });
    let parsedResponse;
    try{
      parsedResponse = JSON.parse(completion.choices[0].message.content);
    }catch(parseError){
      throw new Error('Failed to parse AI response');
    }
    return parsedResponse;

    }catch(error){
        console.error('AI Service Error:',error.message);
        return {
            valuation:{
                estimatedValue: propertyData.price,
                marketTrend: 'Unknown',
                confidence: 0,
            },
            analysis:{
                summary: "AI Analysis unavailable",
                investmentScore: 0,
                pros: [],
                cons: []
            }
        };
    }
};