import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const userId = searchParams.get('userId');

  try {
    let query = supabase
      .from('bets')
      .select(`
        *,
        creator:users!creatorFarcasterId(username, profilePicUrl, farcasterId),
        participants:bet_participants(participantFarcasterId, amountWagered)
      `)
      .order('creationTimestamp', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (userId) {
      query = query.eq('creatorFarcasterId', userId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching bets:', error);
      return NextResponse.json({ error: 'Failed to fetch bets' }, { status: 500 });
    }

    return NextResponse.json({ bets: data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      betId,
      creatorFarcasterId,
      description,
      sport,
      eventDetails,
      betType,
      wagerAmount,
      currency,
      smartContractAddress,
      smartContractTxHash
    } = body;

    const { data, error } = await supabase
      .from('bets')
      .insert({
        betId,
        creatorFarcasterId,
        description,
        sport,
        eventDetails,
        betType,
        wagerAmount,
        currency,
        outcome: 'pending',
        status: 'open',
        creationTimestamp: new Date().toISOString(),
        smartContractAddress,
        smartContractTxHash
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating bet:', error);
      return NextResponse.json({ error: 'Failed to create bet' }, { status: 500 });
    }

    return NextResponse.json({ bet: data }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
