const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
});

exports.analyzeProperty = async(propertyData)=>{
    try{
        const prompt = `
You are a real estate market analyst.


IMPORTANT RULES:
- Do NOT assume the listed price is correct.
- First estimate a fair market price independently.
- Base your estimate on price-per-sqft reasoning.
- If the property is overvalued or undervalude, the estimated value MUST differ meaningfully.
        
Assume typical urban real estate trends in India.
Provide heuristic, non-authoritative estimates for decision support only.

PROPERTY DETAILS:
      - Location: ${propertyData.location}
      - Property Type: ${propertyData.type}
      - Size: ${propertyData.size} sqft
      - Bedrooms: ${propertyData.bedrooms}
      - Features: ${(propertyData.features||[]).join(', ')}

LISTED PRICE (for comparison only, NOT estimation):
₹${propertyData.price}
STEP 1: Estimate a resonable price per sqft for this location and property type.
STEP 2: Calculate a fair market value using: price_per_sqft × size
STEP 3: Compare the fair market value with the listed price and decide if it is:
- Overpriced
- Underpriced
- Fairly priced
STEP 4: Provide a market trend prediction:
- Upward
- Stable
- Downward
STEP 5: Provide a confidence score (0-100) based on your analysis.
STEP 6: Provide a short executive summary.
STEP 7: Provide an investment score (0-10) based on your analysis.
STEP 8: Provide an array of pros and cons.

Respond ONLY in STRICT JSON format:
      {
        "valuation": {
          "estimatedValue": number,
          "marketTrend": "Upward" |"Stable" | "Downward",
          "confidence": number 
        },
        "analysis": {
          "summary": string,
          "investmentScore": number,
          "pros": string[],
          "cons": string[]
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