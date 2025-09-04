import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      betId,
      participantFarcasterId,
      selectedOutcome,
      amountWagered,
      smartContractTxHash
    } = body;

    // Insert participant record
    const { data: participantData, error: participantError } = await supabase
      .from('bet_participants')
      .insert({
        betId,
        participantFarcasterId,
        selectedOutcome,
        amountWagered,
        status: 'pending'
      })
      .select()
      .single();

    if (participantError) {
      console.error('Error adding participant:', participantError);
      return NextResponse.json({ error: 'Failed to join bet' }, { status: 500 });
    }

    // Update bet status to active
    const { error: updateError } = await supabase
      .from('bets')
      .update({ 
        status: 'active',
        smartContractTxHash 
      })
      .eq('betId', betId);

    if (updateError) {
      console.error('Error updating bet status:', updateError);
    }

    return NextResponse.json({ participant: participantData }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
